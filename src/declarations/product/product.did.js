export const idlFactory = ({ IDL }) => {
  const AutoScalingCanisterSharedFunctionHook = IDL.Func(
      [IDL.Text],
      [IDL.Text],
      [],
    );
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Nat,
    'count' : IDL.Nat,
  });
  const ScalingOptions = IDL.Record({
    'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
    'sizeLimit' : ScalingLimitType,
  });
  const Project = IDL.Record({
    'contactlinks' : IDL.Vec(IDL.Text),
    'teamInformation' : IDL.Text,
    'projectDescription' : IDL.Text,
    'projectTitle' : IDL.Text,
    'projectId' : IDL.Text,
    'projectImages' : IDL.Text,
    'risksandchallanges' : IDL.Text,
    'fundusageplan' : IDL.Text,
    'objectives' : IDL.Text,
    'fundingTarget' : IDL.Text,
    'socialmedialinks' : IDL.Vec(IDL.Text),
  });
  const project1 = IDL.Record({
    'contactlinks' : IDL.Vec(IDL.Text),
    'teamInformation' : IDL.Text,
    'projectDescription' : IDL.Text,
    'projectTitle' : IDL.Text,
    'projectImages' : IDL.Text,
    'risksandchallanges' : IDL.Text,
    'fundusageplan' : IDL.Text,
    'objectives' : IDL.Text,
    'fundingTarget' : IDL.Text,
    'socialmedialinks' : IDL.Vec(IDL.Text),
  });
  const Scanproject = IDL.Record({
    'projects' : IDL.Vec(Project),
    'nextKey' : IDL.Opt(IDL.Text),
  });
  const Product = IDL.Service({
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'getprojectbyprojectId' : IDL.Func([IDL.Text], [IDL.Opt(Project)], []),
    'projectadd' : IDL.Func([IDL.Text, project1], [IDL.Text], []),
    'scanUsers' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [Scanproject],
        [],
      ),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
  });
  return Product;
};
export const init = ({ IDL }) => {
  const AutoScalingCanisterSharedFunctionHook = IDL.Func(
      [IDL.Text],
      [IDL.Text],
      [],
    );
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Nat,
    'count' : IDL.Nat,
  });
  const ScalingOptions = IDL.Record({
    'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
    'sizeLimit' : ScalingLimitType,
  });
  return [
    IDL.Record({
      'owners' : IDL.Opt(IDL.Vec(IDL.Principal)),
      'partitionKey' : IDL.Text,
      'scalingOptions' : ScalingOptions,
    }),
  ];
};
