export function setBtnText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    btn.textContent = "Saveing...";
  } else {
    btn.textContent = "Save";
  }
}
