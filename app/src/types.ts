import { Moralis } from "moralis/types";
export interface PostAttributes extends Moralis.Attributes {
    imageURL?: string;
    caption?: string;
    userAddress?: string;
}

export interface Post extends Moralis.Object {
    attributes: PostAttributes;
}

export interface Posts extends Array<PostAttributes> {}
