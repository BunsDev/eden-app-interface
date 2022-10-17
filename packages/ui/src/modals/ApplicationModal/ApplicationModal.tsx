import { Project, RoleType } from "@eden/package-graphql/generated";
import {
  Avatar,
  AvatarList,
  AvatarProps,
  Modal,
  ProgressStepper,
  ProjectChampion,
} from "@eden/package-ui";

type ApplicationProgressType = {
  applied: boolean;
  reviewed: boolean;
  assesment: boolean;
  interview: boolean;
  induction: boolean;
  onboarding: boolean;
};

export interface ApplicationModalProps {
  isModalOpen: boolean;
  Project?: Project;
  Role?: RoleType;
  ApplicationProgress: ApplicationProgressType;
}

export const ApplicationModal = ({
  isModalOpen,
  Project,
  Role,
  ApplicationProgress,
}: ApplicationModalProps) => {
  const filterCommittedTeam = Project?.team?.filter(
    (member) => member?.phase === "committed"
  );

  const filterCommittedTeamAvatars = filterCommittedTeam?.map((member) => ({
    src: member?.memberInfo?.discordAvatar,
    size: "xs",
    alt: member?.memberInfo?.discordName,
  }));

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        console.log("close");
        // setShowModal(false);
      }}
    >
      <div className="mb-10 flex gap-10 p-5">
        <div className="flex flex-col items-start justify-center gap-5">
          <div className="flex items-center justify-center gap-3">
            <div>
              <Avatar
                size="lg"
                isProject
                emoji={Project?.emoji as string}
                backColorEmoji={Project?.backColorEmoji as string}
              />
            </div>
            <div>
              <h1 className="text-soilHeading1 font-semibold">
                {Project?.title}
              </h1>
              <p className="text-soilHeading3 text-soilGray leading-6">
                {Project?.descriptionOneLine}
              </p>
            </div>
          </div>
          <p className="text-soilBody font-Inter">{Project?.description}</p>
          <div className="w-full">
            <h1 className="text-soilHeading3 font-medium">{Role?.title}</h1>
            <div className="flex items-start justify-between">
              <ul>
                <li>{Role?.keyRosponsibilities}</li>
              </ul>
              <div className="text-soilGray font-medium">
                <div>
                  <h1>⌛ {Role?.hoursPerWeek} h / week</h1>
                </div>
                <div>
                  <h1>💰 $CODE {Role?.budget?.perMonth} / week</h1>
                </div>
                <div>
                  <h1>
                    📆1 season {Role?.dateRangeStart} - {Role?.dateRangeEnd}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center">
            <h3>Match</h3>
            <h1 className="text-soilHeading1 text-soilPurple font-poppins font-semibold">
              65%
            </h1>
          </div>
          <div
            className={`m-auto flex w-full flex-col content-center items-center justify-center `}
          >
            <ProjectChampion member={Project?.champion!} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-Inter text-soilGray text-soilHeading3 mb-3 font-semibold">
              CORE TEAM
            </p>
            <AvatarList avatars={filterCommittedTeamAvatars as AvatarProps[]} />
          </div>
        </div>
      </div>
      <ProgressStepper
        steps={[
          { name: "Applied", completed: ApplicationProgress?.applied },
          { name: "Reviewed", completed: ApplicationProgress?.reviewed },
          { name: "Assesment", completed: ApplicationProgress?.assesment },
          { name: "interview", completed: ApplicationProgress?.interview },
          { name: "Induction", completed: ApplicationProgress?.induction },
          { name: "Onboarding", completed: ApplicationProgress?.onboarding },
        ]}
      />
    </Modal>
  );
};
