
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, ThumbsUp, Share2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dummy community posts
const communityPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
      role: "Event Manager",
    },
    date: "2 days ago",
    content: "Just finished organizing our annual tech conference with zero waste! Thanks to Eco Gen Events for connecting us with local recycling centers and helping us donate leftover food to Hope Children's Home.",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: "MC",
      role: "Sustainability Director",
    },
    date: "1 week ago",
    content: "Tip for fellow event organizers: Plan your waste management strategy before the event. Categorize expected waste and identify nearby facilities that can handle each type. This has helped us reduce landfill waste by 85%!",
    likes: 42,
    comments: 8,
  },
  {
    id: 3,
    author: {
      name: "Grace Okafor",
      avatar: "GO",
      role: "Orphanage Director",
    },
    date: "2 weeks ago",
    content: "A huge thank you to all the event organizers who have donated food to our orphanage through Eco Gen Events. Your contributions have made a significant difference in the lives of our children.",
    likes: 67,
    comments: 12,
  },
];

const Community = () => {
  const { toast } = useToast();

  const handlePostInteraction = (action, postId) => {
    toast({
      title: "Coming Soon!",
      description: `${action} functionality will be available in the next update.`,
    });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Coming Soon!",
      description: "Posting functionality will be available in the next update.",
    });
  };

  return (
    <MainLayout>
      <div className="eco-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">
            Connect with other sustainability-minded event organizers and partners
          </p>
        </div>

        {/* Create Post */}
        <Card className="eco-card mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Share your experience or ask a question</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostSubmit}>
              <div className="space-y-4">
                <textarea
                  className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="What's on your mind?"
                ></textarea>
                <div className="flex justify-end">
                  <Button type="submit" className="eco-btn-primary">
                    Post
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Community Posts */}
        <div className="space-y-6">
          {communityPosts.map((post) => (
            <Card key={post.id} className="eco-card">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="" alt={post.author.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{post.author.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{post.author.role} • {post.date}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <div className="w-full flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center text-muted-foreground"
                    onClick={() => handlePostInteraction("Like", post.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {post.likes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center text-muted-foreground"
                    onClick={() => handlePostInteraction("Comment", post.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center text-muted-foreground"
                    onClick={() => handlePostInteraction("Share", post.id)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => toast({ title: "Coming Soon!", description: "More community posts will be available in the next update." })}>
            Load More
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Community;
