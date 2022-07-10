import { ipfs, store } from "@graphprotocol/graph-ts";
import {
    Social,
    DeletePost as DeletePostEvent,
    NewPost as NewPostEvent
} from "../generated/Social/Social";
import { Post, Author } from "../generated/schema";

export function handleNewPost(event: NewPostEvent): void {
    let postId = event.params.id.toString();
    let user = event.params.author;
    let author = Author.load(user.toHex());
    if (author == null) {
        author = new Author(user.toHex());
        author.posts = [];
    }

    let post = new Post(postId);
    let ipfs = event.params.ipfs;
    post.ipfsHash = ipfs;
    post.author = user.toHex();

    post.save();

    author.posts.push(ipfs);
    author.save();
}
export function handleDeletePost(event: DeletePostEvent): void {
    let postId = event.params.id.toString();
    let post = Post.load(postId);
    if (post == null) {
        return;
    }

    // delete entry of post from the graph
    store.remove("Post", postId);

    // delete post from the author's list of posts
    let author = Author.load(post.author);
    if (author == null) {
        return;
    }

    let index = author.posts.indexOf(postId);
    if (index > -1) {
        author.posts.splice(index, 1);
    }
    author.save();
}
