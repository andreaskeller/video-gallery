import { getChannelInfo } from "lib/youtube";
import Link from "next/link";

export default function Home({ channelInfos }) {
  return (
    <div>
      <div className="mx-auto max-w-6xl p-4 lg:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {channelInfos.map((channelInfo) => {
            const {
              id,
              snippet: { title, thumbnails },
            } = channelInfo.items[0];

            return (
              <Link key={id} href={`/channel/${id}`}>
                <a>
                  <img src={thumbnails.medium?.url} />
                  <div className="line-clamp-2 text-sm font-medium mt-2">
                    {title}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const channels = [
    "UC0TsOcFEW9FoTP6qdvZIJqA", // Kevin Langeree
    "UCmzxts0YGES5tN-oJ9abTQg", // Kai Lenny
    "UCueYbWdMJ-u7xb7gKE2B2Qw", // Ruben Lenten
    "UCpvzntBAE9Yq3NTOVOdEpqQ", // Aaron Hadlow
    "UCa4U3I1RkE1bVHKQXz1azDw", // Tom Court
    "UCY6tC9P0Vf1uMxcMB2fDn8g", // Sam Light
    "UCbexBMlbpOKHFIdT-8ZeeGA", // Jake Kelsick
    "UCe_SfX2ZD8pRoyE7atPNu2g", // Jeremie Tronet
    "UCR4-Msn347sPVPxdbBXNaZQ", // Gisela Pulido Borrell
    "UCr8Yh0AcsZqsDXl2QKTV7lA", // Jalou Langeree
    "UCPqFFxV6vhkNso2XeDdALOQ", // Bruna Kajiya
    "UCOXq-tcD4X_QmksdqWsfIrA", // Hannah Whiteley
  ];

  const channelInfos = await Promise.all(
    channels.map((channelId) => getChannelInfo(channelId))
  );

  return {
    props: {
      channelInfos,
    },
  };
}
