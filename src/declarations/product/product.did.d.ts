import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AutoScalingCanisterSharedFunctionHook = ActorMethod<
  [string],
  string
>;
export interface Product {
  'getPK' : ActorMethod<[], string>,
  'getprojectbyprojectId' : ActorMethod<[string], [] | [Project]>,
  'projectadd' : ActorMethod<[string, project1], string>,
  'scanUsers' : ActorMethod<
    [string, string, bigint, [] | [boolean]],
    Scanproject
  >,
  'skExists' : ActorMethod<[string], boolean>,
  'transferCycles' : ActorMethod<[], undefined>,
}
export interface Project {
  'contactlinks' : Array<string>,
  'teamInformation' : string,
  'projectDescription' : string,
  'projectTitle' : string,
  'projectId' : string,
  'projectImages' : string,
  'risksandchallanges' : string,
  'fundusageplan' : string,
  'objectives' : string,
  'fundingTarget' : string,
  'socialmedialinks' : Array<string>,
}
export type ScalingLimitType = { 'heapSize' : bigint } |
  { 'count' : bigint };
export interface ScalingOptions {
  'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
  'sizeLimit' : ScalingLimitType,
}
export interface Scanproject {
  'projects' : Array<Project>,
  'nextKey' : [] | [string],
}
export interface project1 {
  'contactlinks' : Array<string>,
  'teamInformation' : string,
  'projectDescription' : string,
  'projectTitle' : string,
  'projectImages' : string,
  'risksandchallanges' : string,
  'fundusageplan' : string,
  'objectives' : string,
  'fundingTarget' : string,
  'socialmedialinks' : Array<string>,
}
export interface _SERVICE extends Product {}
