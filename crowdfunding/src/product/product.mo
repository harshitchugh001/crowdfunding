import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Productfunction "productfunc";
import Type "product-types";

shared ({ caller = owner }) actor class Product({
  // the primary key of this canister
  partitionKey: Text;
  // the scaling options that determine when to auto-scale out this canister storage partition
  scalingOptions: CanDB.ScalingOptions;
  // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
  owners: ?[Principal];
}) {
  /// @required (may wrap, but must be present in some form in the canister)
  stable let db = CanDB.init({
    pk = partitionKey;
    scalingOptions = scalingOptions;
    btreeOrder = null;
  });

  /// @recommended (not required) public API
  public query func getPK(): async Text { db.pk };

  /// @required public API (Do not delete or change)
  public query func skExists(sk: Text): async Bool { 
    CanDB.skExists(db, sk);
  };

  /// @required public API (Do not delete or change)
  public shared({ caller = caller }) func transferCycles(): async () {
    if (caller == owner) {
      return await CA.transferCycles(caller);
    };
  };


  //product code

  public func projectadd(userId:Text,Info:Type.project1) : async Text {
    return await Productfunction.addproject(db,userId,Info);
  };


  public func getprojectbyprojectId(projectId:Text) : async ?Type.Project {
    return await Productfunction.getprojectbyId(db,projectId);
  };

  public func scanUsers(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async Type.Scanproject{
    return await Productfunction.scanUsers(db,skLowerBound,skUpperBound,limit,ascending);
  };




}