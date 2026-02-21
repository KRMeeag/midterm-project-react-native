import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Job,
  JobsApiResponse,
  JobsProcessed,
  JobsApiResponseWithIds,
} from "../types";
import axios from "axios";
import uuid from "react-native-uuid";

const API_URL = "https://empllo.com/api/v1";

interface JobContextType {
  data: JobsProcessed[];
  loading: boolean;
  onBookmarksPress: (id: string) => void;
  bookmarkedEntries: JobsProcessed[];
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<JobsProcessed[]>([]);
  const [bookmark, setBookmark] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const savedIds = new Set(bookmark)
  const bookmarkedEntries = data.filter(obj => savedIds.has(obj.id));


  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<JobsApiResponse>(API_URL);

      const processedResponse: JobsProcessed[] = response.data.jobs.map(
        (job) => ({
          ...job,
          id: uuid.v4().toString(),
          isSaved: false,
        }),
      );

      setData(processedResponse);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   To remove
  useEffect(() => {
    console.log(data);
  }, [data, loading]);

  // To Remove
  useEffect(() => {
    console.log(bookmarkedEntries);
  }, [bookmark]);

  const onBookmarksPress = (id: string) => {
    setBookmark((prevBookmarks) =>
      prevBookmarks.includes(id)
        ? prevBookmarks.filter((item) => item !== id)
        : [...prevBookmarks, id],
    );

    setData(prev => prev.map(obj => 
        obj.id === id ? {...obj, isSaved: !obj.isSaved} : obj
    ));

  };

  return (
    <JobContext.Provider value={{ data, loading, onBookmarksPress, bookmarkedEntries }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJob must be within a JobProvider");
  return context;
};
