import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Type "login-types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import UserId "../helpers/unique";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Loginfunction "loginfunc";
import Userfunction "userfunction";

shared ({caller = owner}) actor class Login({
  // the primary key of this canisterstoredUserInfo
  partitionKey : Text;
  // the scaling options that determine when to auto-scale out this canister storage partition
  scalingOptions : CanDB.ScalingOptions;
  // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
  owners : ?[Principal];
}) {
  /// @required (may wrap, bustoredUserInfot must be present in some form in the canister)
  stable let db = CanDB.init({
    pk = partitionKey;
    scalingOptions = scalingOptions;
    btreeOrder = null;
  });

  /// @recommended (not required) public API
  public query func getPK() : async Text {db.pk};

  /// @required public API (Do not delete or change)
  public query func skExists(sk : Text) : async Bool {
    CanDB.skExists(db, sk);
  };

  /// @required public API (Do not delete or change)
  public shared ({caller = caller}) func transferCycles() : async () {
    if (caller == owner) {
      return await CA.transferCycles(caller);
    };
  };

  //main code

public func signUp(Info : Type.UserInfo) : async Text {
  Debug.print(debug_show(db.pk));
  return await Loginfunction.signUp(db,Info);
};

public func login (user: Type.userlogin) : async Text {
  Debug.print(debug_show(db.pk));
  return await Loginfunction.login(db,user);
};


public func userdetail(userId:Text,detail:Type.userdetails) : async Text {
  Debug.print(debug_show(db.pk));
  // Debug.print(debug_show(db.scalingOptions.autoScallingHook));
  return await Userfunction.userdetail(db,userId,detail);
};

public func getuserdetail(userId:Text) : async ?Type.userdetails {
  return await Userfunction.getuserdetail(db,userId);
};

public func addprojectId(projectId:Text,userId:Text) : async () {
  return await Userfunction.addprojectId(db,projectId,userId);
}

};
