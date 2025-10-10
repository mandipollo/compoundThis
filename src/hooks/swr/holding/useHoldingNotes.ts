import { fetcher } from "@/libs/fetcher";
import { Note } from "@/types/Note.type";
import useSWR from "swr";

const useHoldingNotes = (holding: string) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: {
			success: boolean;
			data: Note[];
		};
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(`/api/holding/note/get?ticker=${holding}`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useHoldingNotes;
