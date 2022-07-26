import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Sidebar from "../../components/sidebar/sidebar";
import Customers from "../customers/customers";
import Customer from "../../components/customer/customer";
import BrandImageAdd from "../../components/brandImageAdd/brandImageAdd";
import BrandAddImageModal from "../brandAddImageModal/brandAddImageModal";
import BlockAddPage from "../../components/blockAddPage/blockAddPage";
import BannerAddAdmin from "../bannerAddAdmin/bannerAddAdmin";
import AddBannerModal from "../addBannerModal/addBannerModal";
import UpdateBannerModal from "../updateBannerModal/updateBannerModal";
import BlockContext from "../../context/SingleBlock";
import SingleBlockModal from "../singleBlockModal/singleBlockModal";
import AddBlockModal from "../addBlockModal/addBlockModal";
import BlockImageUploadModal from "../blockImageUploadModal/blockImageUploadModal";
import PricingAddPage from "../../components/pricingAddPage/pricingAddPage";
import UpdatePriceModal from "../updatePriceModal/updatePriceModal";
import AddPriceModal from "../addPriceModal/addPriceModal";
import ProgramOptions from "../programOptions/programOptions";
import SingleProgramOptionModal from "../singleProgramOptionModal/singleProgramOptionModal";
import AddProgramOptionModal from "../addProgramOptionModal/addProgramOptionModal";
import "./admin.scss";
function Admin() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [modalBrandAddImage, setModalBrandAddImage] = useState(false);
  const [isVisibleAddBanner, setIsVisibleAddBanner] = useState(false);
  const [isUpdateBanner, setIsUpdateBanner] = useState(false);
  const [isAddBlockModal, setIsBlockModal] = useState(false);
  const [bannerData, setBannerData] = useState({});
  const [isBlockImageUploadVisible, setIsBlockImageUploadVisible] =
    useState(false);
  const [imageId, setImageId] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const [array, setArray] = useState({});
  const [isVisiblePriceModal, setIsVisiblePriceModal] = useState(false);
  const [isAddPriceModal, setIsAddPriceModal] = useState(false);
  const [programOptionsData, setProgramOptionsData] = useState({});
  const [isProgramOptionModal, setIsProgramOptionModal] = useState(false);
  const [isAddProgramOptionModal, setIsAddProgramOptionModal] = useState(false);
  const [isProgramOptionLoading, setIsProgramOptionLoading] = useState(false);
  const username = JSON.parse(window.localStorage.getItem("username"));
  const ctx = useContext(BlockContext);

  // const fetchOneUser = async (userID) => {
  //   try {
  //     const url = `${process.env.REACT_APP_HOST}/users/${userID}`;
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //       },
  //     });
  //     if (response.ok) {
  //       const json = await response.json();
  //       setUser(json);
  //       setCartIsVisible(true);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const fetchOneUser = (data) => {
    setCartIsVisible(true);
    setUser(data);
  };

  // const updateBannerHandler = async (bannerId) => {
  //   try {
  //     const url = `${process.env.REACT_APP_HOST}/banner/one/${bannerId}`;
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //       },
  //     });
  //     if (response.ok) {
  //       const json = await response.json();
  //       setBannerData(json.one_banner);
  //       setIsUpdateBanner(true);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const updateBannerHandler = (data) => {
    setBannerData(data);
    setIsUpdateBanner(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };
  const showBrandImageAdd = () => {
    setModalBrandAddImage(true);
  };
  const hideBrandImageAdd = () => {
    setModalBrandAddImage(false);
  };
  const showAddBanner = () => {
    setIsVisibleAddBanner(true);
  };
  const hideAddBanner = () => {
    setIsVisibleAddBanner(false);
  };
  const hideUpdateBanner = () => {
    setIsUpdateBanner(false);
  };
  const showAddBlockModal = () => {
    setIsBlockModal(true);
  };
  const hideAddBlockModal = () => {
    setIsBlockModal(false);
  };
  const showImageUploadBlockModal = () => {
    setIsBlockImageUploadVisible(true);
  };
  const hideImageUploadBlockModal = () => {
    setIsBlockImageUploadVisible(false);
  };
  const showPriceModal = () => {
    setIsVisiblePriceModal(true);
  };
  const hidePriceModal = () => {
    setIsVisiblePriceModal(false);
  };

  const showAddPriceModal = () => {
    setIsAddPriceModal(true);
  };
  const hideAddPriceModal = () => {
    setIsAddPriceModal(false);
  };

  const showProgramOptionModal = () => {
    setIsProgramOptionModal(true);
  };
  const hideProgramOptionModal = () => {
    setIsProgramOptionModal(false);
  };
  const showAddProgramOptionModal = () => {
    setIsAddProgramOptionModal(true);
  };
  const hideAddProgramOptionModal = () => {
    setIsAddProgramOptionModal(false);
  };
  const navigate = useNavigate();

  const singlePrice = (item) => {
    setArray(item);
    showPriceModal();
  };
  const singleProgramOption = (item) => {
    setProgramOptionsData(item);
    showProgramOptionModal();
  };
  return (
    <div className="admin">
      {cartIsVisible && (
        <Customer
          onHideCart={hideCartHandler}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          user={user}
        />
      )}

      {modalBrandAddImage && (
        <BrandAddImageModal
          onHideCart={hideBrandImageAdd}
          setIsImageLoading={setIsImageLoading}
        />
      )}
      {isVisibleAddBanner && (
        <AddBannerModal
          hideAddBanner={hideAddBanner}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {isUpdateBanner && (
        <UpdateBannerModal
          bannerData={bannerData}
          hideAddBanner={hideUpdateBanner}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {ctx.isVisibleModal && <SingleBlockModal />}

      {isAddBlockModal && (
        <AddBlockModal hideAddBlockModal={hideAddBlockModal} />
      )}
      {isBlockImageUploadVisible && (
        <BlockImageUploadModal
          showImageUploadBlockModal={showImageUploadBlockModal}
          hideImageUploadBlockModal={hideImageUploadBlockModal}
          imageId={imageId}
        />
      )}
      {isVisiblePriceModal && (
        <UpdatePriceModal
          array={array}
          hidePriceModal={hidePriceModal}
          setIsLoading={setIsLoading}
        />
      )}
      {isAddPriceModal && (
        <AddPriceModal
          hideAddPriceModal={hideAddPriceModal}
          setIsLoading={setIsLoading}
        />
      )}
      {isProgramOptionModal && (
        <SingleProgramOptionModal
          programOptionsData={programOptionsData}
          hideProgramOptionModal={hideProgramOptionModal}
          setIsProgramOptionLoading={setIsProgramOptionLoading}
        />
      )}
      {isAddProgramOptionModal && (
        <AddProgramOptionModal
          hideAddProgramOptionModal={hideAddProgramOptionModal}
          setIsProgramOptionLoading={setIsProgramOptionLoading}
        />
      )}
      <Sidebar />
      <div className="head_nav ">
        <div className="profil__items ">
          <span style={{ color: "white" }}>
            <i className="bi bi-person-circle"></i>
            {username}
          </span>
          <button
            className="logout__btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Log Out <LogoutIcon fontSize="large" sx={{ marginLeft: "5px" }} />
          </button>
        </div>
      </div>

      <Routes>
        <Route
          path="customer"
          element={
            <Customers
              onShowCart={fetchOneUser}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="block"
          element={
            <div className="inner__container">
              <BlockAddPage
                showAddBlockModal={showAddBlockModal}
                hideAddBlockModal={hideAddBlockModal}
                showImageUploadBlockModal={showImageUploadBlockModal}
                setImageId={setImageId}
              />
            </div>
          }
        />
        <Route
          path="banner"
          element={
            <div className="inner__container">
              <BannerAddAdmin
                showAddBanner={showAddBanner}
                updateBannerHandler={updateBannerHandler}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          }
        />
        <Route
          path="brandImage"
          element={
            <div className="inner__container">
              <BrandImageAdd
                onShowModalAdd={showBrandImageAdd}
                isImageLoading={isImageLoading}
                setIsImageLoading={setIsImageLoading}
              />
            </div>
          }
        />
        <Route
          path="price"
          element={
            <div className="inner__container">
              <PricingAddPage
                singlePrice={singlePrice}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                showAddPriceModal={showAddPriceModal}
              />
            </div>
          }
        />
        <Route
          path="opportunities"
          element={
            <div className="inner__container">
              <ProgramOptions
                singleProgramOption={singleProgramOption}
                isProgramOptionLoading={isProgramOptionLoading}
                setIsProgramOptionLoading={setIsProgramOptionLoading}
                showAddProgramOptionModal={showAddProgramOptionModal}
              />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default Admin;
