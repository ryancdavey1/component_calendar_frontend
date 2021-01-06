# ComponentCalendar

## Description

ComponentCalendar is a single-page application, build with Javascript on the frontend and Rails on the backend. Users can add tasks to the calendar, which scrolls horizontally. Tasks can contain a name, description, number of hours to completion, completed status, and state date. Tasks fall under Initiatives, which can be selected as: Organization, Work, Coding, or Projects.

[ComponentCalend Backend Repo](https://github.com/ryancdavey1/component_calendar_backend)


## Built With

* [Javascript](https://www.javascript.com/)
* [Rails](https://rubyonrails.org/)

## Installation

Try this app in your local environment, clone both the frontend and backend repos and run following command inside the backend directory

    $ bundle
    $ rails db:migrate

Start up local server

    $ rails s

For interactive console

    $ rails c

From frontend directory, open index.html within a browser

## Future improvements
* Group tasks by initiative
* Edit task form
* Create initiative form
* User authentication
* Tasks stretching across multiple days
* [Bulma](https://bulma.io/) - Using this CSS framework


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ryancdavey1/component_calendar_frontend.

## License

The project is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
