import { Octokit } from 'octokit';

export default function GistUploader({ userAccessToken }) {
  // Create a new gist on this user account
  const doSend = async () => {
    console.log('sending...');

    const files = {
      "test1.txt": {
        "content": "this is a test"
      }
    }

    const octokit = new Octokit({ auth: userAccessToken });
    const res = await octokit.request('POST /gists', {
      files: files
    });

    console.log('response', res);
  };

  return (
    <section>
      <h4 className="mt0">Create a Gist</h4>
      <p>Click the button below to create a new gist in your GitHub account with some placeholder text.</p>
      <button className="mt0" onClick={doSend}>Create</button>
    </section>

  );
};