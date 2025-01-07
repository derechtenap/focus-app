import database from "../database";

// Remove the "uuid" property from the Profile type.
// This is because the "uuid" property is not meant to be updated.
type PartialProfile = Omit<Partial<Profile>, "uuid">;

const updateProfileFromDatabase = async (
  updatedProfileData: PartialProfile,
  uuid: Profile["uuid"]
) => {
  await database.profiles.where("uuid").equals(uuid).modify(updatedProfileData);
};

export default updateProfileFromDatabase;
