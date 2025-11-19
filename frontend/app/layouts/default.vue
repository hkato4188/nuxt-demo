

    <template>
        <UDashboardNavbar>
        <ULink to="http://localhost:3000/teachers">Teacher's Page</ULink>
        <ULink to="http://localhost:3000/students">Students's Page</ULink>
        <ULink to="http://localhost:3001/classes">Class Database Page</ULink>
        <ULink to="http://localhost:3001/behaviorRecords">Behavior Records Database Page</ULink>
        <ULink to="http://localhost:3001/weeklySummaries">Weekly Summaries Database Page</ULink>
        </UDashboardNavbar>
        
        <slot/>
    </template>


