// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class DeletePost extends ethereum.Event {
  get params(): DeletePost__Params {
    return new DeletePost__Params(this);
  }
}

export class DeletePost__Params {
  _event: DeletePost;

  constructor(event: DeletePost) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get author(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class NewPost extends ethereum.Event {
  get params(): NewPost__Params {
    return new NewPost__Params(this);
  }
}

export class NewPost__Params {
  _event: NewPost;

  constructor(event: NewPost) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get ipfs(): string {
    return this._event.parameters[1].value.toString();
  }

  get author(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Social extends ethereum.SmartContract {
  static bind(address: Address): Social {
    return new Social("Social", address);
  }

  postAuthor(param0: BigInt): Address {
    let result = super.call("postAuthor", "postAuthor(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_postAuthor(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("postAuthor", "postAuthor(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  posts(param0: BigInt): string {
    let result = super.call("posts", "posts(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toString();
  }

  try_posts(param0: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("posts", "posts(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class DeletePostCall extends ethereum.Call {
  get inputs(): DeletePostCall__Inputs {
    return new DeletePostCall__Inputs(this);
  }

  get outputs(): DeletePostCall__Outputs {
    return new DeletePostCall__Outputs(this);
  }
}

export class DeletePostCall__Inputs {
  _call: DeletePostCall;

  constructor(call: DeletePostCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DeletePostCall__Outputs {
  _call: DeletePostCall;

  constructor(call: DeletePostCall) {
    this._call = call;
  }
}

export class NewPostCall extends ethereum.Call {
  get inputs(): NewPostCall__Inputs {
    return new NewPostCall__Inputs(this);
  }

  get outputs(): NewPostCall__Outputs {
    return new NewPostCall__Outputs(this);
  }
}

export class NewPostCall__Inputs {
  _call: NewPostCall;

  constructor(call: NewPostCall) {
    this._call = call;
  }

  get _ipfs(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class NewPostCall__Outputs {
  _call: NewPostCall;

  constructor(call: NewPostCall) {
    this._call = call;
  }
}