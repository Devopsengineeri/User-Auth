const userUpload = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    if (!profilePicture) {
      res.status(400).send({ msg: "Profile picture is required" });
    }
    await User.create({ profilePicture });
    res.status(200).send({ msg: "Profile picture upload Succesfull" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};
