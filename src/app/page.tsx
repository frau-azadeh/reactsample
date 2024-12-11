import { ButtonClick } from "./component/ButtonClick";
import { CartCounter } from "./component/CartCounter";
import { RemoveButton } from "./component/RemoveButton";
import { ShoppingCart } from "./component/ShoppingCart";
import { SnapRouteSelector } from "./component/SnapRouteSelector";
import { TestButtomClick } from "./component/TestButtomClick";
import { TimeruseState } from "./component/TimeruseState";

export default function Home() {
  return (
<div>
  <h1>hi my best</h1>
    <CartCounter/>
    <TimeruseState/>
    <ButtonClick/>
    <ShoppingCart/>
    <SnapRouteSelector />
    <TestButtomClick />
    <RemoveButton />
</div>
  );
}
