export const testController = (req, res) => {
  try {
    res.json({ message: 'Api connected' });
  } catch (error) {
    console.log(error);
  }
};
