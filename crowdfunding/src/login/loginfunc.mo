import Type "login-types";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Text "mo:base/Text";
import UserId "../helpers/unique";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

module {

    public func signUp(db : CanDB.DB, Info : Type.UserInfo) : async Text {
        let storedUser = await fetchuser(db : CanDB.DB, Info.userEmail);
        switch (storedUser) {
            case (?value) {
                return "user is already registered";
            };
            case (null) {
                if (Info.userName == "" or Info.userPassword == "" or Info.userConfirmPassword == "") {
                    return " ";
                };
                if (Info.userPassword != Info.userConfirmPassword) {
                    return "Password and confirm password are not the same";
                } else {

                    let userId = await UserId.GetUniqueId(Info.userEmail);
                    Debug.print(debug_show (userId));
                    await* CanDB.put(
                        db,
                        {
                            sk = Info.userEmail;
                            attributes = [
                                ("userId", #text(userId)),
                                ("userName", #text(Info.userName)),
                                ("userEmail", #text(Info.userEmail)),
                                ("userPassword", #text(Info.userPassword)),
                            ];
                        },
                    );
                    return "User successfully registered";
                };
            };
        };
    };
    //fetch user
    public func fetchuser(db : CanDB.DB, userEmail : Text) : async ?Type.storedUserInfo {
        let data = switch (CanDB.get(db, {sk = userEmail})) {
            case null {null};
            case (?userEntity) {unwrapUserDetail(userEntity)};
        };
        Debug.print(debug_show (data));
        switch (data) {
            case (?value) {?value};

            case (null) {null};

        }; 
    };

    //unwraperdetail of fetchuser
    func unwrapUserDetail(entity : Entity.Entity) : ?Type.storedUserInfo {
        let {sk; attributes} = entity;
        let userId = Entity.getAttributeMapValueForKey(attributes, "userId");
        let userName = Entity.getAttributeMapValueForKey(attributes, "userName");
        let userEmail = Entity.getAttributeMapValueForKey(attributes, "userEmail");
        let userPassword = Entity.getAttributeMapValueForKey(attributes, "userPassword");
        switch (userId, userName, userEmail, userPassword) {
            case (
                ?(#text(userId)),
                ?(#text(userName)),
                ?(#text(userEmail)),
                ?(#text(userPassword)),
            ) {?{userId; userName; userEmail; userPassword}};
            case _ {
                null;
            };
        };
    };
    //login user
    public func login(db : CanDB.DB, user : Type.userlogin) : async Text {
        let storedUser = await fetchuser(db : CanDB.DB, user.userEmail);
        Debug.print(debug_show (storedUser));
        switch (storedUser) {
            case (?storedUserData) {
                if (Text.equal(user.userPassword,storedUserData.userPassword) and Text.equal(user.userEmail, storedUserData.userEmail)) {
                    return "Login success";
                } else {
                    throw Error.reject("Invalid user credentials");
                };
            };
            case (null) {
                throw Error.reject("User not found");
            };
        };
    };
};
