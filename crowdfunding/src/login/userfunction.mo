import Type "login-types";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

module {

    public func userdetail(db : CanDB.DB,userId:Text,detail:Type.userdetails) : async Text {
        let userdetail = await getuserdetail(db : CanDB.DB,detail.userId);

        switch(userdetail){
            case(?value){
                return "user detail already added";
            };
            case (null){
                await* CanDB.put(
            db,
            {
              sk = detail.userId;
              attributes = [
                ("userId", #text(detail.userId)),
                ("username",#text(detail.username)),
                ("firstname",#text(detail.firstname)),
                ("lastname",#text(detail.lastname)),
                ("description",#text(detail.description)),
                ("phonenumber",#text(detail.phonenumber)),
                ("userEmail",#text(detail.userEmail)),
                ("nationality",#text(detail.nationality)),
                ("projectsId",#arrayText(detail.projectsId)),
                ("investedId",#arrayText(detail.investedId)),
                ("userImage",#text(detail.userImage)),
                ("qualification",#text(detail.qualification)),
                ("linkedInid",#text(detail.linkedInid)),   
              ];
            },
          );
          return "user details saved";         
        };
        };  
    };

    public func getuserdetail(db : CanDB.DB,userId:Text) : async ?Type.userdetails {
        let data =switch(CanDB.get(db,{sk=userId})){
            case null {null};
            case (?userdetail){unwraperuserdetail(userdetail)};
        };
        Debug.print(debug_show(data));

        switch(data){
            case (?value) {?value};
            case (null) {null};
        };

    };

    func unwraperuserdetail(entity:Entity.Entity) : ?Type.userdetails{
        let {sk;attributes}=entity;

        let userId=Entity.getAttributeMapValueForKey(attributes,"userId");
        let username=Entity.getAttributeMapValueForKey(attributes,"username");
        let firstname=Entity.getAttributeMapValueForKey(attributes,"firstname");
        let lastname=Entity.getAttributeMapValueForKey(attributes,"lastname");
        let description=Entity.getAttributeMapValueForKey(attributes,"description");
        let phonenumber=Entity.getAttributeMapValueForKey(attributes,"phonenumber");
        let userEmail=Entity.getAttributeMapValueForKey(attributes,"userEmail");
        let nationality=Entity.getAttributeMapValueForKey(attributes,"nationality");
        let projectsId=Entity.getAttributeMapValueForKey(attributes,"projectsId");
        let investedId=Entity.getAttributeMapValueForKey(attributes,"investedId");
        let userImage=Entity.getAttributeMapValueForKey(attributes,"userImage");
        let qualification=Entity.getAttributeMapValueForKey(attributes,"qualification");
        let linkedInid=Entity.getAttributeMapValueForKey(attributes,"linkedInid");

        switch(userId,username,firstname,lastname,description,phonenumber,userEmail,nationality,projectsId,investedId,userImage,qualification,linkedInid){
            case(
                ?(#text(userId)),
                ?(#text(username)),
                ?(#text(firstname)),
                ?(#text(lastname)),
                ?(#text(description)),
                ?(#text(phonenumber)),
                ?(#text(userEmail)),
                ?(#text(nationality)),
                ?(#arrayText(projectsId)),
                ?(#arrayText(investedId)),
                ?(#text(userImage)),
                ?(#text(qualification)),
                ?(#text(linkedInid)),
            ){?{userId;username;firstname;lastname;description;phonenumber;userEmail;nationality;projectsId;investedId;userImage;qualification;linkedInid}};
            case _ {
                null;
            };
        };
    };

    public func addprojectId(db : CanDB.DB,projectId:Text,userId:Text) : async () {

    }

   
};
