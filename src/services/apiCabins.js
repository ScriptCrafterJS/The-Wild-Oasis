import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  // we have to ensure that the image name is unique
  // we replace slashes with hyphens so supabase dont make nested files
  const imageName = `${Math.random()}-${newCabin.image[0].name.replace(
    /\//g,
    "-"
  )}`;
  // https://lnnisvdtfnhnfqvfaahn.supabase.co/storage/v1/object/public/avatars/cabin-001.jpg
  // 1. create the cabin
  const { data, error } = await supabase.from("cabins").insert([newCabin]);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }

  // 2. upload the image of the cabin

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted!");
  }

  return data;
}
