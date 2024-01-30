import Text "mo:base/Text"

module{
    public type Investment ={
        investmentId:Text;
        userId:Text;
        investmentProject:Text;
        projectId:Text;
        fundamount:Text;
        fundingreq:Text;
        stake:Text;
        termsandcondition:Text;
        priorinvestor:Text;
        investmentsoldTo:[Text];
        soldprice:Text;
        modeofpayment:Text;
    };

    public type Investment1={
        userId:Text;//investment done userid
        investmentProject:Text;
        projectId:Text;
        fundamount:Text;
        fundingreq:Text;
        stake:Text;
        termsandcondition:Text;
        priorinvestor:Text;
        investmentsoldTo:[Text];
        soldprice:Text;
        modeofpayment:Text;
    };
}