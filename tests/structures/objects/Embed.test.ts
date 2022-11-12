import '../../../dist/nodeInit.js';
import {expect,} from 'chai';
import {suite, test} from 'mocha';
import {Embed} from "../../../dist/index.js";

suite("Embed", () => {
    test("Default initialization", () => {
        const embed = new Embed();
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Data initialization", () => {
        const date = new Date();

        expect(() => {new Embed({timestamp: date.getTime().toString()})}).to.throw(RangeError);
        const embedTimestampStr = new Embed({timestamp: date.toISOString()});
        expect(embedTimestampStr.data).to.deep.equal({timestamp: date.toISOString()});
        const embedTitle = new Embed({title: "Title"});
        expect(embedTitle.data).to.deep.equal({title: "Title"});
        const embedDescription = new Embed({description: "Description"});
        expect(embedDescription.data).to.deep.equal({description: "Description"});
        const embedUrl = new Embed({url: "https://example.com"});
        expect(embedUrl.data).to.deep.equal({url: "https://example.com"});
        const embedColor = new Embed({color: 0xFF0000});
        expect(embedColor.data).to.deep.equal({color: 0xFF0000});
        const embedFooter = new Embed({footer: {text: "Footer"}});
        expect(embedFooter.data).to.deep.equal({footer: {text: "Footer"}});
        const embedImage = new Embed({image: {url: "https://example.com/image.png"}});
        expect(embedImage.data).to.deep.equal({image: {url: "https://example.com/image.png"}});
        const embedThumbnail = new Embed({thumbnail: {url: "https://example.com/thumbnail.png"}});
        expect(embedThumbnail.data).to.deep.equal({thumbnail: {url: "https://example.com/thumbnail.png"}});

        const embedAll = new Embed({
            title: "Title",
            description: "Description",
            url: "https://example.com",
            timestamp: date.toISOString(),
            color: 0xFF0000,
            footer: {
                text: "Footer",
                icon_url: "https://example.com/footer.png",
            },
            image: {
                url: "https://example.com/image.png",
            },
            thumbnail: {
                url: "https://example.com/thumbnail.png",
            },
        });
        expect(embedAll.data).to.deep.equal({
            title: "Title",
            description: "Description",
            url: "https://example.com",
            timestamp: date.toISOString(),
            color: 0xFF0000,
            footer: {
                text: "Footer",
                icon_url: "https://example.com/footer.png",
            },
            image: {
                url: "https://example.com/image.png",
            },
            thumbnail: {
                url: "https://example.com/thumbnail.png",
            },
        });
    });

    test("Set title", () => {
        const embed = new Embed();

        embed.setTitle("Title");
        expect(embed.data).to.deep.equal({title: "Title"});
        expect(embed.toJson()).to.deep.equal({title: "Title"});

        embed.setTitle(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        embed.setTitle("Title 2");
        expect(embed.data).to.deep.equal({title: "Title 2"});
        expect(embed.toJson()).to.deep.equal({title: "Title 2"});

        embed.setTitle(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Set description", () => {
        const embed = new Embed();

        embed.setDescription("Description");
        expect(embed.data).to.deep.equal({description: "Description"});
        expect(embed.toJson()).to.deep.equal({description: "Description"});

        embed.setDescription(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        embed.setDescription("Description 2");
        expect(embed.data).to.deep.equal({description: "Description 2"});
        expect(embed.toJson()).to.deep.equal({description: "Description 2"});

        embed.setDescription(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Set url", () => {
        const embed = new Embed();

        embed.setURL("https://example.com");
        expect(embed.data).to.deep.equal({url: "https://example.com"});
        expect(embed.toJson()).to.deep.equal({url: "https://example.com"});

        embed.setURL(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        embed.setURL("https://example.com/2");
        expect(embed.data).to.deep.equal({url: "https://example.com/2"});
        expect(embed.toJson()).to.deep.equal({url: "https://example.com/2"});

        embed.setURL(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Set timestamp", () => {
        const embed = new Embed();

        const Date1 = new Date;

        embed.setTimestamp(Date.now());
        expect(embed.data).to.deep.equal({timestamp: Date1.toISOString()});
        expect(embed.toJson()).to.deep.equal({timestamp: Date1.toISOString()});

        embed.setTimestamp(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        const Date2 = new Date;

        embed.setTimestamp(Date2.getTime());
        expect(embed.data).to.deep.equal({timestamp: Date2.toISOString()});
        expect(embed.toJson()).to.deep.equal({timestamp: Date2.toISOString()});

        embed.setTimestamp(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Set color", () => {
        const embed = new Embed();

        embed.setColor(0xFFFFFF);
        expect(embed.data).to.deep.equal({color: 0xFFFFFF});
        expect(embed.toJson()).to.deep.equal({color: 0xFFFFFF});

        embed.setColor(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        embed.setColor(0x000000);
        expect(embed.data).to.deep.equal({color: 0x000000});
        expect(embed.toJson()).to.deep.equal({color: 0x000000});

        embed.setColor(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Set thumbnail", () => {
        const embed = new Embed();

        embed.setThumbnail("https://example.com/thumbnail.png");
        expect(embed.data).to.deep.equal({thumbnail: {url: "https://example.com/thumbnail.png"}});
        expect(embed.toJson()).to.deep.equal({thumbnail: {url: "https://example.com/thumbnail.png"}});

        embed.setThumbnail(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        embed.setThumbnail("https://example.com/thumbnail2.png");
        expect(embed.data).to.deep.equal({thumbnail: {url: "https://example.com/thumbnail2.png"}});
        expect(embed.toJson()).to.deep.equal({thumbnail: {url: "https://example.com/thumbnail2.png"}});

        embed.setThumbnail(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Set image", () => {
        const embed = new Embed();

        embed.setImage("https://example.com/image.png");
        expect(embed.data).to.deep.equal({image: {url: "https://example.com/image.png"}});
        expect(embed.toJson()).to.deep.equal({image: {url: "https://example.com/image.png"}});

        embed.setImage(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        embed.setImage("https://example.com/image2.png");
        expect(embed.data).to.deep.equal({image: {url: "https://example.com/image2.png"}});
        expect(embed.toJson()).to.deep.equal({image: {url: "https://example.com/image2.png"}});

        embed.setImage(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Set author", () => {
        const embed = new Embed();

        embed.setAuthor({name: "Author", icon_url: "https://example.com/author.png"});
        expect(embed.data).to.deep.equal({author: {name: "Author", icon_url: "https://example.com/author.png", url: undefined}});
        expect(embed.toJson()).to.deep.equal({author: {name: "Author", icon_url: "https://example.com/author.png", url: undefined}});

        embed.setAuthor(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        embed.setAuthor({name: "Author 2", url: "https://example.com/"});
        expect(embed.data).to.deep.equal({author: {name: "Author 2", url: "https://example.com/", icon_url: undefined}});
        expect(embed.toJson()).to.deep.equal({author: {name: "Author 2", url: "https://example.com/", icon_url: undefined}});

        embed.setAuthor(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});

        embed.setAuthor({name: "Author 3", icon_url: "https://example.com/author.png", url: "https://example.com/"});
        expect(embed.data).to.deep.equal({author: {name: "Author 3", icon_url: "https://example.com/author.png", url: "https://example.com/"}});
        expect(embed.toJson()).to.deep.equal({author: {name: "Author 3", icon_url: "https://example.com/author.png", url: "https://example.com/"}});
    });

    test("Set footer", () => {
        const embed = new Embed();

        embed.setFooter({text: "Footer", icon_url: "https://example.com/footer.png"});
        expect(embed.data).to.deep.equal({footer: {text: "Footer", icon_url: "https://example.com/footer.png"}});
        expect(embed.toJson()).to.deep.equal({footer: {text: "Footer", icon_url: "https://example.com/footer.png"}});

        embed.setFooter(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });

    test("Set fields", () => {
        const embed = new Embed();

        embed.setFields([
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]);
        expect(embed.data).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]});
        expect(embed.toJson()).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]});

        embed.setFields([]);
        expect(embed.data).to.deep.equal({fields: []});
        expect(embed.toJson()).to.deep.equal({fields: []});
    });

    test("Add fields", () => {
        const embed = new Embed();

        embed.addFields([
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]);
        expect(embed.data).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]});
        expect(embed.toJson()).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]});

        embed.addFields([]);
        expect(embed.data).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]});
        expect(embed.toJson()).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]});

        embed.addFields([
            {name: "Field 4", value: "Value 4"},
            {name: "Field 5", value: "Value 5"},
            {name: "Field 6", value: "Value 6"},
        ]);
        expect(embed.data).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1"},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
            {name: "Field 4", value: "Value 4"},
            {name: "Field 5", value: "Value 5"},
            {name: "Field 6", value: "Value 6"},
        ]});
    });

    test("Add field", () => {
        const embed = new Embed();

        embed.addField("Field 1", "Value 1");
        expect(embed.data).to.deep.equal({fields: [{name: "Field 1", value: "Value 1", inline: false}]});
        expect(embed.toJson()).to.deep.equal({fields: [{name: "Field 1", value: "Value 1", inline: false}]});

        embed.addField("Field 2", "Value 2", true);
        expect(embed.data).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1", inline: false},
            {name: "Field 2", value: "Value 2", inline: true},
        ]});
        expect(embed.toJson()).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1", inline: false},
            {name: "Field 2", value: "Value 2", inline: true},
        ]});

        embed.addField("Field 3", "Value 3", false);
        expect(embed.data).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1", inline: false},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]});
        expect(embed.toJson()).to.deep.equal({fields: [
            {name: "Field 1", value: "Value 1", inline: false},
            {name: "Field 2", value: "Value 2", inline: true},
            {name: "Field 3", value: "Value 3", inline: false},
        ]});
    });

    test("Set timestamp", () => {
        const embed = new Embed();

        const date = new Date;

        embed.setTimestamp(date);
        expect(embed.data).to.deep.equal({timestamp: date.toISOString()});
        expect(embed.toJson()).to.deep.equal({timestamp: date.toISOString()});

        embed.setTimestamp(null);
        expect(embed.data).to.deep.equal({});
        expect(embed.toJson()).to.deep.equal({});
    });
});
