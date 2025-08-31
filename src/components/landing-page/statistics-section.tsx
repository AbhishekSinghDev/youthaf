const StatisticsSection = () => {
  return (
    <div className="pb-16 grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
      <div className="text-center p-6 rounded-xl bg-primary/5">
        <div className="text-2xl font-bold text-primary mb-2">50000+</div>
        <div className="text-sm text-muted-foreground">Students Helped</div>
      </div>
      <div className="text-center p-6 rounded-xl bg-secondary/5">
        <div className="text-2xl font-bold text-secondary mb-2">100+</div>
        <div className="text-sm text-muted-foreground">Free Resources</div>
      </div>
      <div className="text-center p-6 rounded-xl bg-accent/5">
        <div className="text-2xl font-bold text-accent mb-2">24/7</div>
        <div className="text-sm text-muted-foreground">Platform Access</div>
      </div>
    </div>
  );
};

export default StatisticsSection;
