const userProfile = ({ params }: any) => {
  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div>
        <h1 className="text-2xl font-bold mb-5">Profile</h1>
        <p className="text-sm">
          User Profile is <span className="mx-3 p-2 bg-yellow-600 rounded">{params.id}</span>
        </p>
      </div>
    </div>
  );
};

export default userProfile;
