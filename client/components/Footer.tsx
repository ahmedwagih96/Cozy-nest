const Footer = () => {
  return (
    <div className="bg-blue-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-xl text-white font-bold tracking-tight">
          CozyNest.com
        </span>
        <span className="text-white font-bold tracking-tight flex flex-col sm:flex-row gap-2 md:gap-4">
          <p className="cursor-pointer text-sm">Privacy Policy</p>
          <p className="cursor-pointer text-sm">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
