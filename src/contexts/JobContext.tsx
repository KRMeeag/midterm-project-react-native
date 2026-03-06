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
  onApplication: (id: string) => void;
  onRemoveBookmarks: (ids: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<JobsProcessed[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmark, setBookmark] = useState<string[]>([]);
  const [applied, setApplied] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const savedIds = new Set(bookmark);
  const bookmarkedEntries = data.filter((obj) => savedIds.has(obj.id));

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<JobsApiResponse>(API_URL);

      const processedResponse: JobsProcessed[] = response.data.jobs.map(
        (job) => ({
          ...job,
          id: uuid.v4().toString(),
          isSaved: false,
          isApplied: false,
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

  const onBookmarksPress = (id: string) => {
    setBookmark((prevBookmarks) =>
      prevBookmarks.includes(id)
        ? prevBookmarks.filter((item) => item !== id)
        : [...prevBookmarks, id],
    );

    setData((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, isSaved: !obj.isSaved } : obj,
      ),
    );
  };

  const onApplication = (id: string) => {
    setApplied((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );

    setData((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, isApplied: !obj.isApplied } : obj,
      ),
    );
  };

  const onRemoveBookmarks = (ids: string[]) => {
    setBookmark((prevBookmarks) =>
      prevBookmarks.filter((id) => !ids.includes(id)),
    );

    setData((prevData) =>
      prevData.map((obj) =>
        ids.includes(obj.id) ? { ...obj, isSaved: false } : obj,
      ),
    );
  };

  return (
    <JobContext.Provider
      value={{
        data,
        loading,
        onBookmarksPress,
        bookmarkedEntries,
        onApplication,
        onRemoveBookmarks,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJob must be within a JobProvider");
  return context;
};
