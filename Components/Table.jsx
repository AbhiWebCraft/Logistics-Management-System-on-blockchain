import { useContext, useEffect, useState } from "react";
import { TrackingContext } from "../Context/Tracking";

export default ({ setCreateShipmentModel, allShipmentsdata }) => {
  const { currentUser, getAllShipment } = useContext(TrackingContext);
  const [userShipments, setUserShipments] = useState([]);

  useEffect(() => {
    const fetchUserShipments = async () => {
      if (currentUser) {
        const allShipments = await getAllShipment();
        const filteredShipments = allShipments.filter(
          (shipment) =>
            shipment.sender.toLowerCase() === currentUser.toLowerCase() ||
            shipment.receiver.toLowerCase() === currentUser.toLowerCase()
        );
        setUserShipments(filteredShipments);
      }
    };

    fetchUserShipments();
  }, [currentUser, getAllShipment]);

  const convertTime = (time) => {
    const newTime = new Date(time * 1000); // Convert from seconds to milliseconds
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-grey-800 text-xl font-bold sm:text-2xl">
            Create Tracking
          </h3>
          <p className="text-grey-600 mt-2">
          Use this interface to create a new shipment tracking entry. Fill in the details and monitor the progress of your shipments in real-time.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => setCreateShipmentModel(true)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
          >
            Add Tracking
          </button>
        </div>
      </div>

      {currentUser ? (
        userShipments.length > 0 ? (
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Sender</th>
                  <th className="py-3 px-6">Receiver</th>
                  <th className="py-3 px-6">PickupTime</th>
                  <th className="py-3 px-6">Distance</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Delivery Time</th>
                  <th className="py-3 px-6">Paid</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {userShipments.map((shipment, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.sender.slice(0, 15)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.receiver.slice(0, 15)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {convertTime(shipment.pickupTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.distance} Km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {convertTime(shipment.deliveryTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.isPaid ? "Completed" : "Not Completed"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.status == 0
                        ? "Pending"
                        : shipment.status == 1
                        ? "IN_TRANSIT"
                        : "Delivered"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No shipments found for this account.</p>
        )
      ) : (
        <p className="text-gray-600 mt-4 font-bold">Please connect your wallet to view the shipments.</p>
      )}
    </div>
  );
};
