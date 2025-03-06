import { TProject } from "@/types";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BlogNavigator = ({ currentPostId, projects }: { currentPostId: string, projects: TProject[] }) => {
    // Filter out deleted projects
    const validProjects = projects?.filter((project) => !project.isDeleted);

    // Find the index of the current project
    const currentIndex = validProjects.findIndex((post) => post._id === currentPostId);

    // Determine previous and next projects
    const prevPost = currentIndex > 0 ? validProjects[currentIndex - 1] : null;
    const nextPost = currentIndex < validProjects.length - 1 ? validProjects[currentIndex + 1] : null;

    return (
        <div className="grid md:grid-cols-2 px-2 mt-10 gap-1 rounded-lg">
            {/* Previous Post */}
            <div className="flex items-center justify-center gap-5 bg-white rounded-l-[20px] p-5">
                {prevPost ? (
                    <Link href={`/project/${prevPost.slug}`}>
                        <span className="text-[24px] text-right font-semibold flex items-center gap-1">
                            <FaChevronLeft /> <span>{prevPost.title}</span>
                        </span>
                    </Link>
                ) : (
                    <span className="text-[24px] text-gray-400">No Previous Post</span>
                )}
            </div>

            {/* Next Post */}
            <div className="flex items-center justify-center gap-5 rounded-r-[20px] bg-white p-5">
                {nextPost ? (
                    <Link href={`/project/${nextPost.slug}`}>
                        <span className="text-[24px] font-semibold flex items-center gap-1">
                            <span>{nextPost.title}</span>
                            <FaChevronRight />
                        </span>
                    </Link>
                ) : (
                    <span className="text-[24px] text-gray-400">No Next Post</span>
                )}
            </div>
        </div>
    );
};

export default BlogNavigator;
