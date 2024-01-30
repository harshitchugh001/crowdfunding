import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Text "mo:base/Text";
import UserId "../helpers/unique";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Type "investment-types";
import InvestmentFunction "investmentfunction";


shared ({caller = owner}) actor class Investment({
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

  public func addinvestmentdetail(Info:Type.Investment1): async Text{
    return await InvestmentFunction.addinvestmentdetail(db,Info);
  }






}