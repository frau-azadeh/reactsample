import { ButtonClick } from "./component/ButtonClick";
import { CartCounter } from "./component/CartCounter";
import { RemoveButton } from "./component/RemoveButton";
import { ShoppingCart } from "./component/ShoppingCart";
import { SnapRouteSelector } from "./component/SnapRouteSelector";
import { TestButtomClick } from "./component/TestButtomClick";
import { TimeruseState } from "./component/TimeruseState";
import { Like } from "./component/Like";
import { Rating } from "./component/Rating";
import { ChangeBackGround } from "./component/ChangeBackGround";
import { TextInput } from "./component/TextInput";
import { PageViews } from "./component/PageViews";
import { StarRating } from "./component/StarRating";
import { TodoList } from "./component/TodoList";
import { Categories } from "./component/Categories";
import { PasswordInput } from "./component/PasswordInput";
import { PassengerCounter } from "./component/PassengerCounter";
import { ProductFilter } from "./component/ProductFilter";
import { ProductFilterWithEffect } from "./component/useeffect/ProductFilterWithEffect";
import { ShowApi } from "./component/useeffect/ShowApi";
import PostListWithUseEffect from "./component/useeffect/PostListWithUseEffect";
import PostSearch from "./component/useeffect/PostSearch";
import PostsApp from "./component/useeffect/PostApp";
import PaginatedPosts from "./component/useeffect/PaginatedPosts";
import PaginatedPosts1 from "./component/pagination/PaginatedPosts1";
import { UserList } from "./component/user/UserList";

export default function Home() {
  return (
<div>
  <h1>hi my best</h1>
    <UserList/>
    <PaginatedPosts1/>
    <PaginatedPosts/>
    <PostsApp/>
    <PostSearch/>
    <PostListWithUseEffect/>
    <ShowApi/>
    <ProductFilterWithEffect/>
    <ProductFilter />
    <PassengerCounter/>
    <PasswordInput/>
    <Categories/>
    <TodoList/>
    <StarRating/>
    <PageViews/>
    <TextInput/>
    <ChangeBackGround/>
    <Rating/>
    <Like />
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
