import { useEffect, useState } from "react";
import { ILogDto } from "../../types/log.types";
import axiosInstance from "../../utils/axiosInstance";
import { MY_LOGS_URL } from "../../utils/globalConfig";
import toast from "react-hot-toast";
import moment from "moment";
import AuthSpinner from "../../components/general/AuthSpinner";

const MyLogsPage = () => {
  const [myLogs, setMyLogs] = useState<ILogDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ILogDto[]>(MY_LOGS_URL);
      console.log(response)
      const { data } = response;
      setMyLogs(data);
      setLoading(false);
    } catch (error) {
      toast.error('An Error occurred. Please Contact admins');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogs();
  },[]);

  if (loading) {
    return(
      <div className="w-full">
        <AuthSpinner />
      </div>
    );
  };

  return (
    <div className="pageTemplate2">
      <h1 className="text-2xl font-bold">My Logs</h1>
      <div className="grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg">
        <span>No</span>
        <span>Date</span>
        <span>Username</span>
        <span className='col-span-3'>Description</span>
      </div>
      {myLogs.map((item, index) => (
        <div key={index} className="grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg">
          <span>{index + 1}</span>
          <span>{moment(item.createdAt).fromNow()}</span>
          <span>{item.userName}</span>
          <span className='col-span-3'>{item.description}</span>
        </div>
      ))}
    </div>
  );
};

export default MyLogsPage;