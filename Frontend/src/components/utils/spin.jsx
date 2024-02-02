export const Spinner = () => (
  <div>
    <div className="w-12 h-12 border-4 border-gray-300 rounded-full inline-block relative animate-spin">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 w-8 h-8 rounded-full border-4  border-[rgb(249,115,22)_transparent]"></div>
    </div>
  </div>
);

export const LoadingPage = () => (
  <div className="flex w-full h-96 justify-center items-center">
    <Spinner />
  </div>
);
