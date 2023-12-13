import Text "mo:base/Text";



module{
    public type Project = {
        projectId:Text;
        projectTitle:Text;
        projectDescription:Text;
        projectImages:Text;
        teamInformation:Text;
        objectives:Text;
        fundingTarget:Text;
        fundusageplan:Text;
        risksandchallanges:Text;
        socialmedialinks:[Text];
        contactlinks:[Text];
  };
  public type project1 = {
        projectTitle:Text;
        projectDescription:Text;
        projectImages:Text;
        teamInformation:Text;
        objectives:Text;
        fundingTarget:Text;
        fundusageplan:Text;
        risksandchallanges:Text;
        socialmedialinks:[Text];
        contactlinks:[Text];
  };

  public type Scanproject = {
      projects:[Project];
      nextKey:?Text;
  };
  
}