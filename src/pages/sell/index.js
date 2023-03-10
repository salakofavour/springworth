/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import dynamic from "next/dynamic";
import {
  Navbar,
  Footer,
  Container,
  LoadingSpinner,
  MyHeader,
} from "../../components";
import UserSellingProfileCard from "../../pageComponents/sell/userSellingProfileCard";
import UserProductsContainer from "../../pageComponents/sell/userProductsContainer";

const AddProductModal = dynamic(() =>
  import("../../pageComponents/sell/addProductModal")
);

export default function SellPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [openModal, setModalOpen] = useState(false);

  useEffect(() => {
    openModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [openModal]);

  if (!user) {
    router.push("/");
    return;
  }

  if (user?.loading) return <LoadingSpinner />;

  return (
    <main>
      <MyHeader title={"Sell"} />
      <Navbar />
      <Container>
        <div className="px-2 lg:px-32 mt-5">
          <UserSellingProfileCard
            openModal={openModal}
            setOpenModal={setModalOpen}
            user={user}
          />
          <UserProductsContainer user={user} />
        </div>
      </Container>
      <Footer />
      {openModal && (
        <AddProductModal
          openModal={openModal}
          user={user}
          setModalOpen={setModalOpen}
        />
      )}
    </main>
  );
}
