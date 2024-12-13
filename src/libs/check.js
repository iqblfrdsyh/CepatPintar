export async function checkLastStudy(session) {
  try {
    if (session) {
      const lastStudyTimestamp = new Date(session.user.last_study);

      if (lastStudyTimestamp) {
        const now = new Date();

        const diffInMs = now - lastStudyTimestamp;

        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        const diffInMinutes = Math.floor(
          (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
        );

        console.log(
          `User sudah tidak mengakses selama ${diffInDays} hari ${diffInHours} jam ${diffInMinutes} menit.`
        );
        return { diffInDays, diffInHours };
      } else {
        console.log("User belum memiliki data last_study.");
        return null;
      }
    } else {
      console.log("User tidak ditemukan.");
      return null;
    }
  } catch (error) {
    console.error("Error checking last_study:", error);
    return null;
  }
}
