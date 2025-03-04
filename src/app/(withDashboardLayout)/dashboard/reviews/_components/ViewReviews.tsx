import ViewItemDetails from "@/components/common/ViewItemDetails/ViewItemDetails";
import { TReview } from "@/types";

const ViewReviews = ({ item }: { item: TReview }) => {
  return (
    <div>
      <ViewItemDetails item={item} imageFields={[""]} />
    </div>
  );
};

export default ViewReviews;
