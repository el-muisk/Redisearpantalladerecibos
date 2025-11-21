import svgPaths from "../imports/svg-515x5nwzo3";

function Group() {
  return (
    <div className="absolute bottom-[-0.01%] left-[71.88%] right-0 top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 42">
        <g>
          <path d={svgPaths.p456000} fill="white" />
          <path d={svgPaths.p3ba74a00} fill="white" />
          <path d={svgPaths.p3a01be00} fill="white" />
          <path d={svgPaths.p28826f80} fill="white" />
          <path d={svgPaths.pca8ef00} fill="white" />
          <path d={svgPaths.p1a88a400} fill="white" />
          <path d={svgPaths.p39f4ac00} fill="white" />
          <path d={svgPaths.p23a1f900} fill="white" />
          <path d={svgPaths.p1565fd80} fill="white" />
          <path d={svgPaths.p2c0c7900} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute bottom-[19.43%] left-0 right-[33%] top-[22.68%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82 25">
        <g>
          <path d={svgPaths.p1acb5f00} fill="white" />
          <path d={svgPaths.p8d9ac00} fill="white" />
          <path d={svgPaths.p344610d0} fill="white" />
          <path d={svgPaths.p183df080} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function LogoSura() {
  return (
    <div className="absolute inset-[23.75%_38.98%_23.75%_51.48%] overflow-clip">
      <Group />
      <Group1 />
    </div>
  );
}

export function Header() {
  return (
    <div className="bg-[#2d6df6] h-[80px] w-full relative">
      <LogoSura />
    </div>
  );
}
