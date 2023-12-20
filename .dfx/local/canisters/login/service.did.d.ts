import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AutoScalingCanisterSharedFunctionHook = ActorMethod<
  [string],
  string
>;
export interface Login {
  'addprojectId' : ActorMethod<[string, string], undefined>,
  'getPK' : ActorMethod<[], string>,
  'getuserdetail' : ActorMethod<[string], [] | [userdetails]>,
  'login' : ActorMethod<[userlogin], string>,
  'signUp' : ActorMethod<[UserInfo], string>,
  'skExists' : ActorMethod<[string], boolean>,
  'transferCycles' : ActorMethod<[], undefined>,
  'userdetail' : ActorMethod<[string, userdetails], string>,
}
export type ScalingLimitType = { 'heapSize' : bigint } |
  { 'count' : bigint };
export interface ScalingOptions {
  'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
  'sizeLimit' : ScalingLimitType,
}
export interface UserInfo {
  'userName' : string,
  'userEmail' : string,
  'userPassword' : string,
  'userConfirmPassword' : string,
}
export interface userdetails {
  'firstname' : string,
  'userEmail' : string,
  'username' : string,
  'userId' : string,
  'investedId' : Array<string>,
  'description' : string,
  'userImage' : string,
  'nationality' : string,
  'phonenumber' : string,
  'linkedInid' : string,
  'projectsId' : Array<string>,
  'qualification' : string,
  'lastname' : string,
}
export interface userlogin { 'userEmail' : string, 'userPassword' : string }
export interface _SERVICE extends Login {}
