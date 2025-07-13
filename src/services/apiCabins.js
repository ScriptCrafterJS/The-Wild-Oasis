import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log("Data received to create/edit cabin:", newCabin, id);
  //! its important to note that if this method is ued to edit the cabin, the image of the cabin would be ready and made and no need to extract the path.
  //* .image here might not be a file, it might be a string with the path to the image

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // we have to ensure that the image name is unique
  // we replace slashes with hyphens so supabase dont make nested files
  // 1. create the cabin
  const imageName = `${Math.random()}-${newCabin.image?.name?.replace(
    /[/ ]/g,
    ""
  )}`;
  // insert does not submit the item directly to the storage, and it can return the item it adds
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log("Before operation");

  let query = supabase.from("cabins");
  // Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // Update Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // await is used to wait for the query to finish
  const { data, error } = await query.select().single();

  console.log("Cabin created:", data);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }

  // 2. upload the image of the cabin
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded! and the cabin was not created."
    );
  }

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
