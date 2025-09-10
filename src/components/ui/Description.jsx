const Description = ({ children, className = "", html }) => {
  return (
    <p
      className={`text-xs sm:text-sm text-neutral-400 text-justify leading-relaxed mb-4 sm:mb-6 uppercase tracking-wide font-minecraft ${className}`}
      dangerouslySetInnerHTML={html ? { __html: html } : undefined}
    >
      {!html && children}
    </p>
  );
};

export default Description;
