import "@abraham/reflection";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import "share/utils/extensions";
import { boot } from "boot";

boot();

React.useLayoutEffect = React.useEffect;
configure({ adapter: new Adapter() });