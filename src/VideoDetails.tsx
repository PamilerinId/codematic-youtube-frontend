/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8004';

interface VideoDetails {
  title: string;
  description: string;
  view_count: string;
  like_count: string;
}

interface Comment {
  author: string;
  text: string;
  like_count: number;
}

interface DescriptionProps {
  text: string;
}

const Description: React.FC<DescriptionProps> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="video-description">
      <p className={`description-text ${expanded ? 'expanded' : ''}`}>
        {text}
      </p>
      <button className="description-toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

interface CommentsResponse {
  comments: Comment[];
  nextPageToken: string | null;
}

const VideoDetails: React.FC = () => {
  const [videoId, setVideoId] = useState<string>('');
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchVideoDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/video/${videoId}`);
      console.log(response.data.data);
      setVideoDetails(response.data.data);
      console.log(videoDetails);
      await fetchComments();
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (pageToken?: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/comments/${videoId}`, {
        params: { pageToken }
      });
      if (pageToken) {
        setComments(prevComments => [...prevComments, ...response.data?.data?.comments]);
      } else {
        setComments(response.data?.data?.comments);
      }
      setNextPageToken(response.data?.data?.nextPageToken);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.message : 'An error occurred');
    }
  };

  const loadMoreComments = () => {
    if (nextPageToken) {
      fetchComments(nextPageToken);
    }
  };

  return (
    <div className="video-details">
      <div className="input-section">
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Enter Video ID"
        />
        <button onClick={fetchVideoDetails} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Video Details'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading && <div className="loader"></div>}

      {!loading && videoDetails && (
        <div className="video-info">
          <h2>{videoDetails.title}</h2>
          <Description text={videoDetails.description} />
          <p>Views: {isNaN(parseInt(videoDetails.view_count)) ? 'N/A' : parseInt(videoDetails.view_count).toLocaleString()}</p>
          <p>Likes: {isNaN(parseInt(videoDetails.like_count)) ? 'N/A' : parseInt(videoDetails.like_count).toLocaleString()}</p>
        </div>
      )}

      {!loading && comments.length > 0 && (
        <div className="comments-section">
          <h3>Comments</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="comment">
                <strong>{comment.author}:</strong> {comment.text}
                <span className="like-count">Likes: {comment.like_count}</span>
              </li>
            ))}
          </ul>
          {nextPageToken && (
            <button onClick={loadMoreComments} className="load-more-button">
              Load More Comments
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
