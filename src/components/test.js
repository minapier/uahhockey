var menuToggleButton = $(".navbar_menu-button");
menuToggleButton.on("keydown", function (e) {
  if (e.type === "keydown" && e.which !== 13 && e.which !== 32) {
    return;
  }
  e.preventDefault();
  menuToggleButton.on("click touchend", function (e) {
    $(this).toggleAttrVal("aria-expanded", "false", "true");
    $(".navbar_menu").toggleAttrVal("aria-hidden", "true", "false");
  });
});
