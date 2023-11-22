// import { useRouter } from "next/router";
//
// enum TEXTS {
//   BUTTON_CLOSE = "Close",
// }
//
// function DetailsPage() {
//   const router = useRouter();
//   const { productId } = router.query;
//
//   const overlayRef = useRef<HTMLDivElement>(null);
//   const appSearchParams = useAppSelector(
//     (state) => state.appSearchParamsReducer,
//   );
//
//   function handleCloseDetails() {
//     const newSearchParams = createSearchParams(appSearchParams);
//     router.push(`${ROUTES.home}?${newSearchParams.toString()}`);
//   }
//
//   function handleClickOverlay(eventTarget: EventTarget) {
//     if (eventTarget === overlayRef.current) {
//       handleCloseDetails();
//     }
//   }
//
//   return (
//     <div
//       className={styles.overlay}
//       onClick={(e) => handleClickOverlay(e.target)}
//       ref={overlayRef}
//       role="presentation"
//     >
//       <article className={styles.productDetails} data-testid="product-details">
//         <ProductDetails />
//         <button
//           type="button"
//           onClick={handleCloseDetails}
//           data-testid="details-close"
//         >
//           {TEXTS.BUTTON_CLOSE}
//         </button>
//       </article>
//     </div>
//   );
// }
//
// export default DetailsPage;
