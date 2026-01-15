function validateEntry({ date, project, hours, description }) {
  if (!date || !project || !hours || !description) {
    throw new Error("All fields are required");
  }

  if (hours <= 0) {
    throw new Error("Hours must be a positive number");
  }
}

module.exports = { validateEntry };
