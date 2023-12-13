import Type "product-types";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Text "mo:base/Text";
import UserId "../helpers/unique";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Array "mo:base/Array";

module {

    public func addproject(db : CanDB.DB, userId : Text, Info : Type.project1) : async Text {
        let projectId = await UserId.getuuid();
        await* CanDB.put(
            db,
            {
                sk = projectId;
                attributes = [
                    ("projectId", #text(projectId)),
                    ("projectTitle", #text(Info.projectTitle)),
                    ("projectDescription", #text(Info.projectDescription)),
                    ("projectImages", #text(Info.projectImages)),
                    ("teamInformation", #text(Info.teamInformation)),
                    ("objectives", #text(Info.objectives)),
                    ("fundingTarget", #text(Info.fundingTarget)),
                    ("fundusageplan", #text(Info.fundusageplan)),
                    ("risksandchallenges", #text(Info.risksandchallanges)),
                    ("socialmedialinks", #arrayText(Info.socialmedialinks)),
                    ("contactlinks", #arrayText(Info.contactlinks)),
                ];
            },

        );
        return projectId;

    };

    public func getprojectbyId(db : CanDB.DB, projectId : Text) : async ?Type.Project {
        let data = switch (CanDB.get(db, {sk = projectId})) {
            case null {null};

            case (?projectId) {unwrapprojectDetail(projectId)};
        };
        Debug.print(debug_show (data));
        switch (data) {
            case (?value) {?value};
            case (null) {null};
        };
    };

    func unwrapprojectDetail(entity : Entity.Entity) : ?Type.Project {
        let {sk; attributes} = entity;

        let projectId = Entity.getAttributeMapValueForKey(attributes, "projectId");
        let projectTitle = Entity.getAttributeMapValueForKey(attributes, "projectTitle");
        let projectDescription = Entity.getAttributeMapValueForKey(attributes, "projectDescription");
        let projectImages = Entity.getAttributeMapValueForKey(attributes, "projectImages");
        let teamInformation = Entity.getAttributeMapValueForKey(attributes, "teamInformation");
        let objectives = Entity.getAttributeMapValueForKey(attributes, "objectives");
        let fundingTarget = Entity.getAttributeMapValueForKey(attributes, "fundingTarget");
        let fundusageplan = Entity.getAttributeMapValueForKey(attributes, "fundusageplan");
        let risksandchallanges = Entity.getAttributeMapValueForKey(attributes, "risksandchallanges");
        let socialmedialinks = Entity.getAttributeMapValueForKey(attributes, "socialmedialinks");
        let contactlinks = Entity.getAttributeMapValueForKey(attributes, "contactlinks");

        switch (projectId, projectTitle, projectDescription, projectImages, teamInformation, objectives, fundingTarget, fundusageplan, risksandchallanges, socialmedialinks, contactlinks) {
            case (
                ?(#text(projectId)),
                ?(#text(projectTitle)),
                ?(#text(projectDescription)),
                ?(#text(projectImages)),
                ?(#text(teamInformation)),
                ?(#text(objectives)),
                ?(#text(fundingTarget)),
                ?(#text(fundusageplan)),
                ?(#text(risksandchallanges)),
                ?(#arrayText(socialmedialinks)),
                ?(#arrayText(contactlinks)),
            ) ?{
                projectId;
                projectTitle;
                projectDescription;
                projectImages;
                teamInformation;
                objectives;
                fundingTarget;
                fundusageplan;
                risksandchallanges;
                socialmedialinks;
                contactlinks;
            };
            case _ {
                null;
            };
        };
    };

    public func scanUsers(db : CanDB.DB, skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async Type.Scanproject {
        //cap the amount of entries one can return from database to reduce load and incentive use pagiation
        let cappedLimit = if (limit > 10) {10} else {limit};
        let {entities; nextKey} = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = cappedLimit;
                ascending = ascending;
            },
        );
        {
            projects = arrayUnwarpUser(entities);
            nextKey = nextKey;
        };
    };

    func arrayUnwarpUser(entities : [Entity.Entity]) :[Type.Project] {
        Array.mapFilter<Entity.Entity, Type.Project>(
            entities,
            func(e) {
                let {sk; attributes} = e;
                let projectId = Entity.getAttributeMapValueForKey(attributes, "projectId");
                let projectTitle = Entity.getAttributeMapValueForKey(attributes, "projectTitle");
                let projectDescription = Entity.getAttributeMapValueForKey(attributes, "projectDescription");
                let projectImages = Entity.getAttributeMapValueForKey(attributes, "projectImages");
                let teamInformation = Entity.getAttributeMapValueForKey(attributes, "teamInformation");
                let objectives = Entity.getAttributeMapValueForKey(attributes, "objectives");
                let fundingTarget = Entity.getAttributeMapValueForKey(attributes, "fundingTarget");
                let fundusageplan = Entity.getAttributeMapValueForKey(attributes, "fundusageplan");
                let risksandchallanges = Entity.getAttributeMapValueForKey(attributes, "risksandchallanges");
                let socialmedialinks = Entity.getAttributeMapValueForKey(attributes, "socialmedialinks");
                let contactlinks = Entity.getAttributeMapValueForKey(attributes, "contactlinks");

                switch (projectId, projectTitle, projectDescription, projectImages, teamInformation, objectives, fundingTarget, fundusageplan, risksandchallanges, socialmedialinks, contactlinks) {
                    case (
                        ?(#text(projectId)),
                        ?(#text(projectTitle)),
                        ?(#text(projectDescription)),
                        ?(#text(projectImages)),
                        ?(#text(teamInformation)),
                        ?(#text(objectives)),
                        ?(#text(fundingTarget)),
                        ?(#text(fundusageplan)),
                        ?(#text(risksandchallanges)),
                        ?(#arrayText(socialmedialinks)),
                        ?(#arrayText(contactlinks)),
                    ) ?{
                        projectId;
                        projectTitle;
                        projectDescription;
                        projectImages;
                        teamInformation;
                        objectives;
                        fundingTarget;
                        fundusageplan;
                        risksandchallanges;
                        socialmedialinks;
                        contactlinks;
                    };
                    case _ {
                        null;
                    };
                };

            },
        );
    };

};
