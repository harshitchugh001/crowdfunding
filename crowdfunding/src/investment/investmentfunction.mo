import Type "investment-types";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Text "mo:base/Text";
import UniqueId "../helpers/unique";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

module {
    public func addinvestmentdetail(db:CanDB.DB,Info:Type.Investment1) : async Text {
        let storedData = await fetchinvestment(db : CanDB.DB, Info.userId);
        switch(storedData){
            case(?value){
                return "Investment already done";
            };
            case(null){
                if(Info.userId ==""){
                    return ""
                }else {
                    let investmentId = await UniqueId.getuuid();
                    await* CanDB.put(
                        db,
                        {
                            sk= Info.userId;
                            attributes=[
                                ("investmentId",#text(investmentId)),
                                ("userId", #text(Info.userId)),
                                ("investmentProject",#text(Info.investmentProject)),
                                ("projectId",#text(Info.projectId)),
                                ("fundamount",#text(Info.fundamount)),
                                ("stake",#text(Info.stake)),
                                ("termsandcondition",#text(Info.termsandcondition)),
                                ("priorinvestor",#text(Info.priorinvestor)),
                                ("investmentsoldTo",#arrayText(Info.investmentsoldTo)),
                                ("soldprice",#text(Info.soldprice)),
                                ("modeofpayment",#text(Info.modeofpayment))
                            ];

                        },
                    );
                    return "investment detail added";
                }
            };
        };

    };

    public func fetchinvestment(db:CanDB.DB,userId:Text):async ?Type.Investment{
         let data = switch (CanDB.get(db, {sk = userId})) {
            case null {null};
            case (?investmentEntity) {unwraperInvestmentDetail(investmentEntity)};
        };
        Debug.print(debug_show (data));
        switch (data) {
            case (?value) {?value};

            case (null) {null};

        }; 
    };

    func unwraperInvestmentDetail(entity:Entity.Entity): ?Type.Investment{
        let {sk; attributes} = entity;
        let investmentId = Entity.getAttributeMapValueForKey(attributes, "investmentId");
        let userId = Entity.getAttributeMapValueForKey(attributes, "userId");
        let investmentProject = Entity.getAttributeMapValueForKey(attributes, "investmentProject");
        let projectId = Entity.getAttributeMapValueForKey(attributes, "projectId");
        let fundamount = Entity.getAttributeMapValueForKey(attributes, "fundamount");
        let fundingreq = Entity.getAttributeMapValueForKey(attributes, "fundingreq");
        let stake = Entity.getAttributeMapValueForKey(attributes, "stake");
        let termsandcondition = Entity.getAttributeMapValueForKey(attributes, "termsandcondition");
        let priorinvestor = Entity.getAttributeMapValueForKey(attributes, "priorinvestor");
        let investmentsoldTo = Entity.getAttributeMapValueForKey(attributes, "investmentsoldTo");
        let soldprice = Entity.getAttributeMapValueForKey(attributes, "soldprice");
        let modeofpayment = Entity.getAttributeMapValueForKey(attributes, "modeofpayment");
        switch (investmentId, userId,investmentProject,projectId,fundamount,fundingreq,stake,termsandcondition,priorinvestor,investmentsoldTo,soldprice,modeofpayment) {
            case (
                ?(#text(investmentId)),
                ?(#text(userId)),
                ?(#text(investmentProject)),
                ?(#text(projectId)),
                ?(#text(fundamount)),
                ?(#text(fundingreq)),
                ?(#text(stake)),
                ?(#text(termsandcondition)),
                ?(#text(priorinvestor)),
                ?(#arrayText(investmentsoldTo)),
                ?(#text(soldprice)),
                ?(#text(modeofpayment)),
            ) {?{investmentId ; userId;investmentProject;projectId;fundamount;fundingreq;stake;termsandcondition;priorinvestor;investmentsoldTo;soldprice;modeofpayment}};
            case _ {
                null;
            };
        };
    };




}