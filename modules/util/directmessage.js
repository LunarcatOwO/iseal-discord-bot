export async function DM(BOT, userID, content) {
  try {
    const user = await BOT.users.fetch(userID);
    await user.send(content);
  } catch (error) {
    console.error("User Has Dm disabled");
  }
}
