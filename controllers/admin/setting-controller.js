const SettingGeneral = require("../../models/settings-general-model");

// [GET] /admin/settings/general
module.exports.general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});

  res.render("admin/pages/settings/general", {
    titePage: "Cài đặt chung",
    settingGeneral: settingGeneral
  });
}

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  if (settingGeneral) {
    await SettingGeneral.updateOne({
      _id: settingGeneral._id
    },req.body)
  }
  else {
    const record = new SettingGeneral(req.body);
    await record.save();
  }
  req.flash("success", "Cập nhật cài đặt thành công!");
  res.redirect(req.get("Referer"));
}