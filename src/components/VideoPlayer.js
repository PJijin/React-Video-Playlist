import React from 'react';
import { Player } from 'video-react';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import 'video-react/dist/video-react.css';

export default function VideoPlayer({ currentVideo }) {
	return (
		<div className="video-player">
			{currentVideo ? (
				<Player src={currentVideo} />
			) : (
				<div className="text-muted">
					<p>
						1. Click on the
						<span className="c-icon">
							<PlaylistAddIcon />
						</span>
						Playlist icon
					</p>
					<p>2. Add URL's separated by comma</p>
					<p>3. Save playlist and watch video</p>
				</div>
			)}
		</div>
	);
}
