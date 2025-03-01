import React from 'react';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { PlyrComponent } from 'plyr-react';

export default function VideoPlayer({ currentVideo }) {
	return (
		<div className="video-player">
			{currentVideo ? (
				<div>
					<PlyrComponent
						sources={{
							type: 'video',
							sources: [
								{
									src: currentVideo.url,
									type: 'video/mp4',
									size: 720
								}
							]
						}}
					/>
					<div className="flex center label-name">{currentVideo.name}</div>
				</div>
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
